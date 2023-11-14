import {AccountBalance} from "./AccountBalance";
import {AccountResetButton} from "./AccountResetButton";
import {AccountCollection} from "./AccountCollection";

export function Account() {
  return (
    <div className="account">
      <div className="account-info">
        <AccountBalance balance={1000}/>
        <AccountResetButton handleReset={() => {}}/>
      </div>
      <AccountCollection/>
    </div>
  )
}
