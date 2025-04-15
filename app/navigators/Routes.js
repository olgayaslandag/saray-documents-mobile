import CompanyView from "../views/CompanyView";
import DocumentsView from "../views/DocumentsView";
import FavoritesView from "../views/FavoritesView";
import HomeView from "../views/HomeView";
import MeetRequest from "../views/MeetRequest";
import MeetShowroomRequest from "../views/MeetShowroomRequest";
import OfferFormView from "../views/OfferFormView";
import OffersView from "../views/OffersView";
import SustainabilityView from "../views/SustainabilityView";

const routes = [
    {
        name: "Home",
        label: "Ana Ekran",
        component: DocumentsView || HomeView,
        options: {headerShown: false}
    },
    {
        name: "Favorites",
        label: "Favoriler",
        component: FavoritesView
    },  
    {
        name: "Offers",
        label: "Teklifler",
        component: OffersView
    },
    {
        name: "Documents",
        label: "Dökümanlar",
        component: DocumentsView
    },
    {
        name: "Sustainability",
        label: "Sürdürülebilirlik",
        component: SustainabilityView
    },
    {
        name: "Company",
        label: "Kurumsal",
        component: CompanyView
    },    
    {
        name: "OfferForm",
        label: "Teklif Formu",
        component: OfferFormView
    },
    {
        name: "MeetRequest",
        label: "Toplantı Talebi",
        component: MeetRequest
    },
    {
        name: "MeetShowroomRequest",
        label: "Showroom Randevu Talebi",
        component: MeetShowroomRequest
    }
];


export default routes;