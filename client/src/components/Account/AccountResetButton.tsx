import reset from "../../assets/svg/reset.svg";

interface Props {
  handleReset: VoidFunction;
}
export function AccountResetButton({ handleReset }: Props) {
  return (
    <button className='account-reset-button' onClick={handleReset}>
      <img src={reset} alt="reset icon"/>
    </button>
  )
}
