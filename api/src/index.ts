import { TransactionManager } from './transaction/application/services/transaction-manager';
import { AccountLegalityVerifier } from './account/application/services/legal-account.verifier';
import express, { Application, json } from 'express';
import cors from 'cors';
import { CharactersController } from './character/infrastructure/api/characters.controller';
import { CharactersService } from './character/application/service/characters.service';
import { InMemoryCharactersRepository } from './character/infrastructure/database/in-memory-characters.repository';
import { AccountsService } from './account/application/services/accounts.service';
import { InMemoryAccountRepository } from './account/infrastructure/database/in-memory-account.repository';
import { AccountsController } from './account/infrastructure/api/account.controller';
import { AccountFacade } from './account/public/account.facade';
import { EventBus } from './shared/event-bus';
import { TransactionsController } from './transaction/infrastructure/api/transaction.controller';
import { CharactersFacade } from './character/public/characters.facade';
import { TransactionExecutor } from './transaction/application/services/transaction-executor';

function setup(app: Application) {
    // shared
    const eventBus = new EventBus()

    // accounts
    const repo = new InMemoryAccountRepository();
    const legality = new AccountLegalityVerifier(eventBus)
    const facade = new AccountFacade(repo, legality);
    const accountsService = new AccountsService(repo);
    const accountsController = new AccountsController(accountsService, app);
    
    // characters
    const charactersRepository = new InMemoryCharactersRepository();
    const charactersService = new CharactersService(charactersRepository);
    const charactersFacade = new CharactersFacade(charactersService);
    const charactersController = new CharactersController(charactersService, app);

    // transactions    
    const transactionExecutor = new TransactionExecutor(facade);
    const transactionManager = new TransactionManager(facade, charactersFacade, transactionExecutor);
    const transactionsController = new TransactionsController(transactionManager, app);
}

// TODO: auto-restart app after code changes
// TODO: move tests from original repo
// TODO: eslint + prettier?
// TODO: dotenv

// TODO: pin deps in package.json
async function bootstrap() {
    const app = express();

    // TODO: add /api prefix to routes
    app.use(cors())
    app.use(json());

    const port = process.env.BE_PORT || 3000;

    setup(app);

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
};

bootstrap();

