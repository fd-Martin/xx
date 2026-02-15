import React from "react";
import useRole from "../../../hooks/useRole";

const DashboardHome = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard 🎉</h2>

      {role === "admin" && (
        <p className="text-gray-600">
          As an <span className="font-semibold">Admin</span>, you can manage
          users, books and system settings.
        </p>
      )}

      {role === "librarian" && (
        <p className="text-gray-600">
          As a <span className="font-semibold">Librarian</span>, you can add
          books, manage orders and track inventory.
        </p>
      )}

      {role === "user" && (
        <p className="text-gray-600">
          You can manage your orders, invoices, wishlist and profile here.
        </p>
      )}
    </div>
  );
};

export default DashboardHome;
