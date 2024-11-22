import CompanyView from "../views/CompanyView";
import DocumentsView from "../views/DocumentsView";
import FavoritesView from "../views/FavoritesView";
import HomeView from "../views/HomeView";
import SustainabilityView from "../views/SustainabilityView";

const routes = [
    {
        name: "Home",
        label: "Ana Ekran",
        component: HomeView,
        options: {headerShown: false}
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
        name: "Favorites",
        label: "Favoriler",
        component: FavoritesView
    },    
];


export default routes;