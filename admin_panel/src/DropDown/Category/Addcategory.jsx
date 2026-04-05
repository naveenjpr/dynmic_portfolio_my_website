import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function Addcategory() {
  let baseurl = import.meta.env.VITE_API_URL;

  let navigate = useNavigate();
  let params = useParams();
  let paramsId = params.id;
  console.log("paramsId:", paramsId);
  const [formData, setFormData] = useState({
    Skills: "",
    status: true, // ✅ boolean
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (paramsId) {
      axios
        .post(
          `${baseurl}/api/backend/category/detail/${paramsId}`,
        )
        .then((res) => {
          const { Skills, status } = res.data.data;
          setFormData({ Skills: Skills, status: status.toString() });
        });
    }
  }, [paramsId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    let obj = {
      Skills: e.target.Skills.value,
      status: e.target.status.value,
    };
    if (paramsId) {
      axios
        .put(
          `${baseurl}/api/backend/category/update/${paramsId}`,
          obj,
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Category updated successfully!");
          setTimeout(() => {
            navigate("/Viewcategory");
          }, 2000);
        })
        .catch((err) => {
          console.error("Error updating category:", err);
          toast.error("Error updating category.");
        });
    } else {
      axios
        .post(
          `${baseurl}/api/backend/category/add`,
          obj,
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            toast.success("Category added successfully!");

            setTimeout(() => {
              navigate("/Viewcategory");
            }, 2000);
          } else {
            toast.error("Failed to add category.");
          }
        })
        .catch((err) => {
          console.error("Error adding category:", err);
          toast.error("Error adding category.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
            {/* Title */}

            <Link to="/Addcategory">
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                Add Category
              </h2>
            </Link>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Skill Name */}
              <div>
                <label className="block mb-2 text-sm">Skills Name</label>
                <input
                  type="text"
                  name="Skills"
                  value={formData.Skills}
                  onChange={handleChange}
                  placeholder="Enter skill name"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-sm font-medium"
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg text-sm"
                  onClick={() => setFormData({ name: "", status: "active" })}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
