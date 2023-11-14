interface Props {
  balance: number;
}
export function AccountBalance({ balance }: Props) {
  return (
    <div className="account-balance">
      <span>Balance: </span>
      <span>{balance}</span>
    </div>
  )
}
