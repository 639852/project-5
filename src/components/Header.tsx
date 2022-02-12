/** @jsxImportSource @emotion/react */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { InputAdornment, TextField } from '@mui/material';
import { Brightness4, Brightness5, Search } from '@mui/icons-material';
import { RootState } from '../store';
import { changeSearchValue } from '../store/slices/utilsSlice';
import { headerStyles, themeStyles } from '../style';
import Profile from './Profile';

interface headerProps {
  title: string;
  search?: boolean;
}

function Header({ title, search }: headerProps) {
  const dispatch = useDispatch();

  const { name, avatar } = useSelector((state: RootState) => state.user);
  const [headerSearchValue, setSearchValue] = useState('');

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

  type changeInput = ChangeEvent<HTMLInputElement>;

  // eslint-disable-next-line no-unused-vars
  function debounce(fn: (e: changeInput) => void, wait: number) {
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout;

    return function func(this: () => void, ...args: [e: changeInput]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        fn.apply(this, args);
      }, wait);
    };
  }

  function handleChange(e: changeInput) {
    setSearchValue(e.target.value);
  }

  const changeValue = debounce(handleChange, 400);

  useEffect(() => {
    dispatch(changeSearchValue({ headerSearchValue }));
  }, [headerSearchValue]);

  return (
    <header css={headerStyles}>
      <h1>{title}</h1>
      {search && (
        <TextField
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
          onChange={changeValue}
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
