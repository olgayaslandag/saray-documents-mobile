import CompanyView from "../views/CompanyView";
import DocumentsView from "../views/DocumentsView";
import FavoritesView from "../views/FavoritesView";
import HomeView from "../views/HomeView";
import MeetRequest from "../views/MeetRequest";
import MeetShowroomRequest from "../views/MeetShowroomRequest";
import OfferDetail from "../views/OfferDetail";
import OfferFormView from "../views/OfferFormView";
import OffersView from "../views/OffersView";
import SustainabilityView from "../views/SustainabilityView";
import TicketDetailView from "../views/TicketDetailView";
import TicketFormView from "../views/TicketFormView";
import TicketView from "../views/TicketView";

const routes = [
    {
        name: "Home",
        label: "Ana Ekran",
        component: HomeView,
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
        name: "OfferDetail",
        label: "Teklif Detayı",
        component: OfferDetail
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
    },
    {
        name: "Ticket",
        label: "Bilet",
        component: TicketView        
    },   
    {
        name: "TicketDetail",
        label: "Bilet Detayı",
        component: TicketDetailView
    },
    {
        name: "TicketForm",
        label: "Bilet Formu",
        component: TicketFormView
    }
];


export default routes;