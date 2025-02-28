import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardOverview = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const axiosPublic = useAxiosPublic(); // Hook inside the component
  const axiosSecure = useAxiosSecure(); // Hook inside the component

  // Fetch properties data
  useEffect(() => {
    axiosPublic.get("/properties").then((response) => {
      setData(response.data);
    });
  }, [axiosPublic]); // Dependency on axiosPublic

  // Fetch users data
  // useEffect(() => {
  //   axiosSecure.get("/users").then((response) => {
  //     setUsers(response.data);
  //   });
  // }, [axiosSecure]); // Dependency on axiosSecure

  const totalProperties = data.length;
  const forSale = data.filter((item) => item.status === "For Sale").length;
  const forRent = data.filter((item) => item.status === "For Rent").length;

  const chartData = [
    { name: "For Sale", value: forSale },
    { name: "For Rent", value: forRent },
  ];

  return (
    <div className="">
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-20 p-6">
        <Card className="shadow-md p-4">
          <CardContent>
            <h2 className="font-semibold text-xl">Total Properties</h2>
            <p className="font-bold text-3xl">{totalProperties}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md p-4">
          <CardContent>
            <h2 className="font-semibold text-xl">For Sale</h2>
            <p className="font-bold text-green-600 text-3xl">{forSale}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md p-4">
          <CardContent>
            <h2 className="font-semibold text-xl">For Rent</h2>
            <p className="font-bold text-blue-600 text-3xl">{forRent}</p>
          </CardContent>
        </Card>
      </div>

      {/* <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-6">
        <Card className="shadow-md p-4">
          <CardContent>
            <h2 className="font-semibold text-xl">Total Users</h2>
            <p className="font-bold text-3xl">{users?.length}</p>
          </CardContent>
        </Card>
      </div> */}

      <div className="col-span-1 md:col-span-3 shadow-md p-4 rounded-lg">
        <h2 className="mb-4 font-semibold text-xl">Property Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;

export function Card({ children, className }) {
  return (
    <div className={` rounded-lg shadow card ${className}`}>{children}</div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4 card-body">{children}</div>;
}
