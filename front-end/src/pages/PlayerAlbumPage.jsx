import PlayerAlbum from "../components/PlayerAlbum";
import AccountSettingsTemplate from "../layouts/AccountSettingsTemplate";

export default function ProfilePage() {
    return (
        <AccountSettingsTemplate>
            <PlayerAlbum />
        </AccountSettingsTemplate>
    );
};
