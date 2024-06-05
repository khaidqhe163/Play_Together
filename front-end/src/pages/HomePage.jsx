import ListCarousel from "../components/ListCarousel";
import ListStory from "../components/ListStory";
import Search from "../components/Search";
import DefaultTemplate from "../layouts/DefaultTemplate1";

export default function HomePage() {
    return (
        <DefaultTemplate>
            <ListCarousel />
            <ListStory />
            <Search />
            
        </DefaultTemplate>
    );
};
