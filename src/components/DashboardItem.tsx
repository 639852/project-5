/** @jsxImportSource @emotion/react */
import { dashboardItemStyles } from '../style';

interface DashboardItemProps {
  title: string;
  counter: number;
  after?: string | undefined;
}

function DashboardItem({ title, counter, after }: DashboardItemProps) {
  return (
    <div css={dashboardItemStyles} className="theme">
      <h2>{title}</h2>
      <span className={after ? 'after' : undefined} data-after={after}>
        {counter}
      </span>
    </div>
  );
}

DashboardItem.defaultProps = {
  after: undefined,
};

export default DashboardItem;
