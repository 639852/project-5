/** @jsxImportSource @emotion/react */
import { Avatar } from '@mui/material';
import { profileStyles } from '../style';

interface profileProps {
  name: string | null;
  avatar: string | null;
}

function Profile({ name, avatar }: profileProps) {
  return (
    <div css={profileStyles}>
      <p>{name}</p>
      <Avatar
        src={avatar || undefined}
        alt="Avatar"
        sx={{
          padding: '2px',
          border: '2px solid #DFE0EB',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

// Profile.defaultProps = {
//   name: 'Jones Ferdinand',
//   avatar: '../img/avatar.jpg',
// };

export default Profile;
