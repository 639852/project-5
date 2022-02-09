/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { InputAdornment, TextField } from '@mui/material';
import { Brightness4, Brightness5, Search } from '@mui/icons-material';
import { headerStyles, themeStyles } from '../style';
import { RootState } from '../store';
import Profile from './Profile';
import { changeSearchValue } from '../store/slices/utilsSlice';

interface headerProps {
  title: string;
  search?: boolean;
}

function Header({ title, search }: headerProps) {
  const dispatch = useDispatch();

  const { name, avatar } = useSelector((state: RootState) => state.user);
  const { headerSearchValue } = useSelector((state: RootState) => state.utils);

  function changeTheme(element: SVGSVGElement) {
    if (!element.classList.contains('active')) {
      const elements = element.parentElement?.children || [];
      const body = document.querySelector('body');
      const darkThemeIcon = document.querySelector(
        'svg[data-testid="Brightness4Icon"]'
      );

      Array.from(elements).forEach((el) => {
        el.classList.remove('active');
      });

      element.classList.add('active');

      if (darkThemeIcon?.classList.contains('active')) {
        body?.classList.add('dark');
        localStorage.setItem('theme', 'dark');

        toast.success('Theme changed!', {
          style: {
            background: '#363740',
            color: '#fff',
          },
        });
      } else {
        body?.classList.remove('dark');
        localStorage.setItem('theme', 'light');

        toast.success('Theme changed!');
      }
    }
  }

  return (
    <header css={headerStyles}>
      <h1>{title}</h1>
      {search && (
        <TextField
          value={headerSearchValue}
          type="search"
          label="Search tickets"
          fullWidth
          focused
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            margin: '0 32px',
          }}
          onChange={(e) =>
            dispatch(changeSearchValue({ headerSearchValue: e.target.value }))
          }
        />
      )}
      <div css={themeStyles}>
        <Brightness5
          className="active"
          onClick={(e) => changeTheme(e.currentTarget)}
        />
        <Brightness4 onClick={(e) => changeTheme(e.currentTarget)} />
        <Profile name={name} avatar={avatar} />
      </div>
    </header>
  );
}

Header.defaultProps = {
  search: false,
};

export default Header;
