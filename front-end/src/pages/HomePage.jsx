import ListCarousel from "../components/ListCarousel";
import ListPlayer from "../components/ListPlayer";
import ListStory from "../components/ListStory";
import Search from "../components/Search";
import DefaultTemplate from "../layouts/DefaultTemplate";

export default function HomePage() {
    return (
        <DefaultTemplate>
            <ListCarousel />
            <ListStory />
            <Search />
            <h5 className="text-white my-4">VIP PLAYERS</h5>
            <ListPlayer />
        </DefaultTemplate>
    );
};
