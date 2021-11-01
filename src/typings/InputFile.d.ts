import { FileWithPath } from 'file-selector';

export type InputFile = (FileWithPath | DataTransferItem) & {
    size?: number;
};
