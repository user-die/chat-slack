export type createArg = {
  header?: string
  message?: string
  showInput?: boolean
  accept: (value: string) => void
  initInputValue?: string
}

export interface ModalService {
  create(arg: createArg): void
}
