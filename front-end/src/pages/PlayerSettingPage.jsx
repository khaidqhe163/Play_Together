import PlayerSetting from "../components/PlayerSetting";
import AccountSettingsTemplate from "../layouts/AccountSettingsTemplate";

export default function ProfilePage() {
    return (
        <AccountSettingsTemplate>
            <PlayerSetting />
        </AccountSettingsTemplate>
    );
};
