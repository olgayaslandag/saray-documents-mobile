import DocCatalogIcon from "./icons/DocCatalogIcon";
import DocCertificateIcon from "./icons/DocCertificateIcon";
import DocChartIcon from "./icons/DocChartIcon";
import DocProfilesIcon from "./icons/DocProfilesIcon";
import DocPvcIcon from "./icons/DocPvcIcon";
import DocRollerIcon from "./icons/DocRollerIcon";


export default function GetDocIcon({title, selected}) {
    const find = [
        "ALU | CATALOG - ALU | KATALOG",
        "ALU | LEAFLET - ALU | BROŞÜR",
        "CERTIFICATES - SERTİFİKALAR",
        "COLOR CHARTS - RENK KARTELALARI",
        "INDUSTRIAL PROFILES - ENDÜSTRİYEL PROFİLLER",
        "PVC | CATALOG - PVC | KATALOG",
        "SARAY ROLL - ROLLER SHUTTER SYSTEMS",        
    ];

    const replace = [
        DocCatalogIcon,
        DocCatalogIcon,
        DocCertificateIcon,
        DocChartIcon,
        DocProfilesIcon,
        DocPvcIcon,
        DocRollerIcon
    ];

    const index = find.indexOf(title);

    const IconComponent =  index !== -1 ? replace[index] : DocCatalogIcon;

    return <IconComponent width="40" height="40" fill={selected ? "red" : "black"} />
}