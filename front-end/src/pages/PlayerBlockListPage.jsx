import PlayerBlockList from "../components/PlayerBlockList";
import AccountSettingsTemplate from "../layouts/AccountSettingsTemplate";

export default function ProfilePage() {
    return (
        <AccountSettingsTemplate>
            <PlayerBlockList />
        </AccountSettingsTemplate>
    );
};
