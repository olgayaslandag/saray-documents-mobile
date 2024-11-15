export default function titleReplace(title) {
    const find = [
        "ALU | CATALOG - ALU | KATALOG",
        "ALU | LEAFLET - ALU | BROŞÜR",
        "CERTIFICATES - SERTİFİKALAR",
        "COLOR CHARTS - RENK KARTELALARI",
        "INDUSTRIAL PROFILES - ENDUSTRİYEL PROFİLLER",
        "PVC | CATALOG - PVC | KATALOG",
        "SARAY ROLL - ROLLER SHUTTER SYSTEMS",        
    ];

    const replace = [
        "Alu-Katalog",
        "Alu-Broşür",
        "Sertifika",
        "Kartela",
        "Profiller",
        "PVC",
        "Saray Roll"
    ];

    const index = find.indexOf(title);

    return index !== -1 ? replace[index] : title;
}