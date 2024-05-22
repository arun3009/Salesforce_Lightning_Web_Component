import LightningDatatable from "lightning/datatable";
import customNameTemplate from "./customName.html";
import customNumberTemplate from "./customNumber.html";
import customPictureTemplate from "./customPicture.html";
export default class CustomDataType extends LightningDatatable {

    static customTypes = {
        customNameType: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ["contactName"]
        },
        customNumberType: {
            template: customNumberTemplate,
            standardCellLayout: false,
            typeAttributes: ["rankIcon"]
        },
        customPictureType: {
            template: customPictureTemplate,
            standardCellLayout: true,
            typeAttributes: ["pictureUrl"]
        }
    };
}