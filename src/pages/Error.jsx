import { Link, useRouteError } from "react-router-dom";
import {Button, Result} from 'antd';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
      <Result
          status="500"
          title="Oops"
          subTitle={error.statusText || error.message}
          extra={<Button type="primary"><Link to="/">Go to Home</Link></Button>}
      />
  );
}
