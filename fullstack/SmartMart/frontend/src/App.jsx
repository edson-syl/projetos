import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard"
import Products from "./components/pages/Products";
import SalesHistory from "./components/pages/SalesHistory";
import Categories from "./components/pages/Categories";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        
        {/* -------- Sidebar -------- */}
        <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
          <div className="p-6 font-bold text-xl border-b">
            SmartMart
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <NavItem to="/" label="Dashboard" />
            <NavItem to="/products" label="Products" />
            <NavItem to="/sales" label="Sales" />
            <NavItem to="/categories" label="Categories" />
          </nav>
        </aside>

        {/* -------- Main -------- */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<SalesHistory />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/* -------- Sidebar Item -------- */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `block px-4 py-2 rounded transition 
        ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`
      }
    >
      {label}
    </NavLink>
  );
}
