import { IConversationHistory } from "@/app/(tabs)";
import Input from "./input";
import ModalPlans from "./plans";


export type ActionsNames = 'INPUT' | 'PLANS' | ''

export interface ActionsProps {
  actionName: ActionsNames
  onUserAction: (message: IConversationHistory) => void
}

export default function ChatActions ({ actionName, onUserAction }: ActionsProps) {
  let children: React.JSX.Element = <></>

  switch (actionName) {
    case 'INPUT':
      children = <Input onUserAction={onUserAction} />
      break;

    case 'PLANS':
      children = <ModalPlans onUserAction={onUserAction} />
      break;
  
    default:
      children = <></>
      break;
  }


  return children
}