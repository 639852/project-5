/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/slices/userSlice';
import { RootState } from '../store';

interface SidebarItemProps {
  styles: SerializedStyles;
  icon: ReactElement;
  text: string;
  className?: string;
  exit?: boolean;
}

function SidebarItem({
  styles,
  icon,
  text,
  className,
  exit,
}: SidebarItemProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.utils);

  function changePage(element: HTMLButtonElement) {
    if (!element.classList.contains('active')) {
      const elements = element.parentElement?.children || [];

      Array.from(elements).forEach((el) => {
        el.classList.remove('active');
      });

      element.classList.add('active');
    }
  }

  useEffect(() => {
    const tab: HTMLButtonElement | null = document.querySelector(
      `button[title="${currentPage}"]`
    );

    if (tab) changePage(tab);
  }, [currentPage]);

  function exitFromAccount() {
    dispatch(removeUser());
    localStorage.removeItem('user');

    navigate('/');
  }

  return (
    <button
      className={className}
      type="button"
      css={styles}
      title={text}
      onClick={
        exit
          ? () => exitFromAccount()
          : (e) => {
              changePage(e.currentTarget);

              navigate(`/${text.toLowerCase()}`);
            }
      }
    >
      {icon}
      <p>{text}</p>
    </button>
  );
}

SidebarItem.defaultProps = {
  className: undefined,
  exit: false,
};

export default SidebarItem;
