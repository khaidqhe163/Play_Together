import ListCarousel from "../components/ListCarousel";
import ListStory from "../components/ListStory";
import DefaultTemplate from "../layouts/DefaultTemplate";

export default function HomePage() {
    return (
        <DefaultTemplate>
            <ListCarousel />
            <ListStory />
        </DefaultTemplate>
    );
};
