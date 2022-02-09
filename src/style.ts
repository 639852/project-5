import { css } from '@emotion/react';

export const sidebarItemStyles = css`
  display: flex;
  align-items: center;
  padding: 20px 0 20px 32px;
  margin: 0 -32px;
  box-sizing: border-box;
  border-left: 0 solid #dde2ff;
  cursor: pointer;
  color: inherit;
  transition: all 0.3s, border-left 0.1s;

  &.active {
    border-left: 3px solid #dde2ff;
    background: rgba(159, 162, 180, 0.08);
    transition: all 0.3s;
  }

  &.active svg {
    color: #dde2ff;
  }

  > *:not(:last-child) {
    margin-right: 24px;
    color: var(--secondary-color-text);
  }

  p {
    margin: 0;

    @media (max-width: 1280px) {
      display: none;
    }
  }
`;

export const sidebarStyles = css`
  > .MuiPaper-root {
    max-width: 255px;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
    color: #a4a6b3;
    background: var(--dark-background-color);

    @media (max-width: 1280px) {
      max-width: 88px;
    }
  }
`;

export const logoStyles = css`
  display: flex;
  align-items: center;
  margin-bottom: 60px;

  > *:not(:last-child) {
    margin-right: 12px;
  }

  h2 {
    margin: 0;

    @media (max-width: 1280px) {
      display: none;
    }
  }

  @media (max-width: 1280px) {
    margin: 0 0 40px -5px;
  }
`;

export const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin-left: 255px;

  h1 {
    margin: 0;
  }

  .MuiInputLabel-root.Mui-focused {
    color: #6b7280;

    & + .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
      border-color: #d1d5db;
    }
  }

  @media (max-width: 1280px) {
    margin-left: 88px;
  }
`;

export const themeStyles = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  svg {
    margin: 0 11px;
    cursor: pointer;
    transition: 0.3s;
  }

  svg:first-of-type {
    margin-left: 0;
  }

  svg:last-of-type {
    margin-right: 0;
  }

  svg.active {
    color: #4f4f4f;
  }
`;

export const profileStyles = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 32px;
  margin-left: 32px;
  border-left: 1px solid #dfe0eb;
  cursor: pointer;

  p {
    margin-right: 14px;
    font-weight: 600;
  }

  .MuiAvatar-img {
    border-radius: inherit;
  }
`;

export const dashboardStyles = css`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
`;

export const dashboardItemStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 25%;
  margin: 0 15px;
  padding: 24px 32px;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: center;
  background: #fff;

  .after: after {
    margin-left: 10px;
    content: attr(data-after);
    font-size: 24px;
  }

  h2 {
    margin-top: 0;
    color: #9fa2b4;
  }

  span {
    font-size: 40px;
    font-weight: 700;
  }
`;

export const barChartStyles = css`
  padding: 32px;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  background: #fff;

  h2 {
    margin: 0;
  }

  .date {
    font-size: 12px;
    color: #9fa2b4;
  }

  text[text-anchor='start'] {
    font-size: 14px !important;
  }

  rect[y='3'] {
    ry: 8;
  }

  rect[fill='#377eb8'] {
    stroke: #29cc97;
    fill: #29cc97;
  }

  rect[fill='#4daf4a'] {
    stroke: var(--additional-button-color);
    fill: var(--additional-button-color);
  }

  rect[fill='#e41a1c'] {
    stroke: var(--secondary-button-color);
    fill: var(--secondary-button-color);
  }
`;

export const ticketsStyles = css`
  margin: 15px 32px 30px calc(255px + 32px);
  padding: 25px 32px;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  background: #fff;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1280px) {
    margin-left: calc(88px + 32px);
  }
`;

export const actionsTicketsStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  svg.MuiSvgIcon-root {
    cursor: pointer;
    transition: 0.3s;
  }

  svg.MuiSvgIcon-root.active {
    color: #27ae60;
  }
`;

export const viewTicketsStyles = css`
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const ticketsProfileStyles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 24px;

  &.grid {
    grid-template-rows: 1fr;
    align-items: center;
    grid-column: 1/3;
  }
`;

export const tableRowStyles = css`
  transition: 0.3s,

  &:hover {
    background: rgba(55, 81, 255, 0.04);
  }

  &.complete {
    background: #ebffe5;
  }

  > *:first-of-type {
    padding-left: 32px;
  }
  > *:last-of-type {
    padding-right: 32px;
  }

  .MuiTableCell-root {
    height: 80px;
    font-weight: 600;
    box-sizing: border-box;
  }

  .date {
    font-size: 12px;
    font-weight: 400;
    color: #c5c7cd;
  }
`;

export const ticketsContainerStyles = css`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 32px;

  p {
    font-weight: 600;
  }

  .date {
    font-size: 12px;
    font-weight: 400;
    color: #c5c7cd;
  }

  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ticketsItemStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  grid-gap: 16px;
  padding: 16px 22px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(192, 197, 233, 0.6);

  &.complete {
    background: #ebffe5;
  }
`;
