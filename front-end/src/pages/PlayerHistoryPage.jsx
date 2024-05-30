import PlayerHistory from "../components/PlayerHistory";
import AccountSettingsTemplate from "../layouts/AccountSettingsTemplate";

export default function ProfilePage() {
    return (
        <AccountSettingsTemplate>
            <PlayerHistory />
        </AccountSettingsTemplate>
    );
};
