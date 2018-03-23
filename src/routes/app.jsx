import Trending from 'views/Trending/Trending';
import TableList from 'views/TableList/TableList';
import Statsboard from 'views/Statsboard/Statsboard';
import Typography from 'views/Typography/Typography';
import Icons from 'views/Icons/Icons';

const appRoutes = [
    { path: "/trending", name: "trending", icon: "pe-7s-news-paper", component: Trending },
    { path: "/stats", name: "Statsboard", icon: "pe-7s-graph1", component: Statsboard },
    { path: "/table", name: "Table List", icon: "pe-7s-note2", component: TableList },
    { path: "/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
    { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },    
    { redirect: true, path:"/", to:"/trending", name: "Trending" }
];

export default appRoutes;
