import { IListItem } from './../../../services/SharePoint/IListItem';

export interface IHomeState {
    item: IListItem;
    images: any[];
    currentImg: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    authorName: string;
    teachingBubbleVisible: boolean;
    status: number;
    isSoftwareDev: boolean;
}