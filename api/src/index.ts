import { TransactionManager } from './transaction/application/services/transaction-manager';
import { AccountLegalityVerifier } from './account/application/services/legal-account.verifier';
import express, { Application, json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { CharacterController } from './character/infrastructure/api/character.controller';
import { CharacterService } from './character/application/service/character.service';
import { InMemoryCharacterRepository } from './character/infrastructure/database/in-memory-character.repository';
import { AccountService } from './account/application/services/account.service';
import { InMemoryAccountRepository } from './account/infrastructure/database/in-memory-account.repository';
import { AccountController } from './account/infrastructure/api/account.controller';
import { AccountFacade } from './account/public/account.facade';
import { EventBus } from './shared/event-bus';
import { TransactionController } from './transaction/infrastructure/api/transaction.controller';
import { CharacterFacade } from './character/public/characters.facade';
import { TransactionExecutor } from './transaction/application/services/transaction-executor';
import { TransactionFacade } from './transaction/application/services/transaction.facade';

function setup(app: Application) {
  // shared
  const eventBus = new EventBus();

  // accounts
  const accountRepository = new InMemoryAccountRepository();
  const accountLegalityVerifier = new AccountLegalityVerifier(eventBus);
  const accountFacade = new AccountFacade(accountRepository, accountLegalityVerifier);
  const accountService = new AccountService(accountRepository);
  const accountController = new AccountController(accountService, app);

  // characters
  const characterRepository = new InMemoryCharacterRepository();
  const characterService = new CharacterService(characterRepository);
  const characterFacade = new CharacterFacade(characterService);
  const characterController = new CharacterController(characterService, app);

  // transactions
  const transactionExecutor = new TransactionExecutor(accountFacade);
  const transactionManager = new TransactionManager(
    accountFacade,
    characterFacade,
    transactionExecutor
  );
  const transactionFacade = new TransactionFacade(transactionManager);
  const transactionController = new TransactionController(transactionFacade, app);
}

async function bootstrap() {
  const app = express();

  app.use(cors());
  app.use(json());

  const port = process.env.BE_PORT || 3000;

  setup(app);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

bootstrap();
