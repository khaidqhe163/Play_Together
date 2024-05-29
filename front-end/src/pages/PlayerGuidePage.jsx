import PlayerGuide from "../components/PlayerGuide";
import AccountSettingsTemplate from "../layouts/AccountSettingsTemplate";

export default function ProfilePage() {
    return (
        <AccountSettingsTemplate>
            <PlayerGuide />
        </AccountSettingsTemplate>
    );
};
