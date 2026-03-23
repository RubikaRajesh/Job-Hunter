import React, { useState } from "react";
import { Select, SelectItem } from "@tremor/react";
import Checkbox from "../Common/FormComponents/Checkbox";
import RadioButton from "../Common/FormComponents/RadioButton";

function SideBarFilter({ filters, setFilters }) {
  // Ensure filters have default arrays
  const safeFilters = {
    jobTypes: filters?.jobTypes || [],
    workMode: filters?.workMode || [],
    experience: filters?.experience || 30,
    salaryRange: filters?.salaryRange || { from: 0, to: 10000000000 },
    datePosted: filters?.datePosted || "",
  };

  const handleDatePostChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      datePosted: value,
    }));
  };

  const handleJobTypeChange = (name) => {
    setFilters((prevFilters) => {
      const currentJobTypes = prevFilters?.jobTypes || [];
      return {
        ...prevFilters,
        jobTypes: currentJobTypes.includes(name)
          ? currentJobTypes.filter((type) => type !== name)
          : [...currentJobTypes, name],
      };
    });
  };

  const handleExperienceChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      experience: value,
    }));
  };

  const handleSalaryRangeChange = (from, to) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      salaryRange: {
        from: from,
        to: to,
      },
    }));
  };

  const handleWorkModeChange = (name) => {
    setFilters((prevFilters) => {
      const currentWorkMode = prevFilters?.workMode || [];
      return {
        ...prevFilters,
        workMode: currentWorkMode.includes(name)
          ? currentWorkMode.filter((mode) => mode !== name)
          : [...currentWorkMode, name],
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      datePosted: "",
      jobTypes: [],
      experience: 30,
      salaryRange: {
        from: 0,
        to: 10000000000,
      },
      workMode: [],
    });
  };

  return (
    <div>
      <div className="text-sm ">
        <div className="border-b px-4">
          <div className="flex justify-between py-4 ">
            <span className=" font-bold">Filter</span>
            <span
              className=" font-bold text-red-400 hover:cursor-pointer"
              onClick={clearAllFilters}
            >
              Clear all
            </span>
          </div>
        </div>

        <div className="px-4">
          <div>
            <div className="py-4">
              <span className="font-bold">Date Post</span>
            </div>
            <div className=" mx-auto space-y-6 border-b pb-4">
              <Select onValueChange={handleDatePostChange} value={safeFilters.datePosted}>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this_week">This week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
              </Select>
            </div>
          </div>

          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Job Type</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Checkbox
                  label="Full-time"
                  name="Full-time"
                  checked={safeFilters.jobTypes.includes("Full-time")}
                  onChange={() => handleJobTypeChange("Full-time")}
                  className={"text-gray-500 text-sm font-medium"}
                />
                <Checkbox
                  label="Part-time"
                  name="Part-time"
                  checked={safeFilters.jobTypes.includes("Part-time")}
                  onChange={() => handleJobTypeChange("Part-time")}
                  className={"text-gray-500 text-sm font-medium"}
                />
              </div>
              <div className="flex justify-between">
                <Checkbox
                  label="Internship"
                  name="Internship"
                  checked={safeFilters.jobTypes.includes("Internship")}
                  onChange={() => handleJobTypeChange("Internship")}
                  className={"text-gray-500 text-sm font-medium"}
                />
                <Checkbox
                  label="Freelance"
                  name="Freelance"
                  checked={safeFilters.jobTypes.includes("Freelance")}
                  onChange={() => handleJobTypeChange("Freelance")}
                  className={"text-gray-500 text-sm font-medium"}
                />
              </div>
            </div>
          </div>

          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Experience</span>
            </div>
            <div className=" ">
              <input
                type="range"
                min="0"
                max="30"
                value={safeFilters.experience}
                onChange={(e) => handleExperienceChange(e.target.value)}
                className="slider h-2 w-full rounded-full accent-green-600 outline-none transition-colors duration-150 ease-linear cursor-pointer"
              />
            </div>
            <div className="flex justify-between px-1 text-gray-500 font-medium">
              <span>0 Yrs</span>
              <span className="font-bold text-green-600">
                {safeFilters.experience} Yrs
              </span>
              <span>30 Yrs</span>
            </div>
          </div>

          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Salary Range</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <RadioButton
                  id="under-3LPA"
                  name="salary-range"
                  value="Under ₹3 LPA"
                  label="Under ₹3 LPA"
                  checked={
                    safeFilters.salaryRange.from === 0 &&
                    safeFilters.salaryRange.to === 300000
                  }
                  onChange={() => handleSalaryRangeChange(0, 300000)}
                  className="text-gray-500 text-sm font-medium"
                />
                <RadioButton
                  id="3-6LPA"
                  name="salary-range"
                  value="₹3 LPA - ₹6 LPA"
                  label="₹3 LPA - ₹6 LPA"
                  checked={
                    safeFilters.salaryRange.from === 300000 &&
                    safeFilters.salaryRange.to === 600000
                  }
                  onChange={() => handleSalaryRangeChange(300000, 600000)}
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
              <div className="flex justify-between">
                <RadioButton
                  id="6-10LPA"
                  name="salary-range"
                  value="₹6 LPA - ₹10 LPA"
                  label="₹6 LPA - ₹10 LPA"
                  checked={
                    safeFilters.salaryRange.from === 600000 &&
                    safeFilters.salaryRange.to === 1000000
                  }
                  onChange={() => handleSalaryRangeChange(600000, 1000000)}
                  className="text-gray-500 text-sm font-medium"
                />
                <RadioButton
                  id="10-15LPA"
                  name="salary-range"
                  value="₹10 LPA - ₹15 LPA"
                  label="₹10 LPA - ₹15 LPA"
                  checked={
                    safeFilters.salaryRange.from === 1000000 &&
                    safeFilters.salaryRange.to === 1500000
                  }
                  onChange={() => handleSalaryRangeChange(1000000, 1500000)}
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
              <div className="flex justify-between">
                <RadioButton
                  id="15-20LPA"
                  name="salary-range"
                  value="₹15 LPA - ₹20 LPA"
                  label="₹15 LPA - ₹20 LPA"
                  checked={
                    safeFilters.salaryRange.from === 1500000 &&
                    safeFilters.salaryRange.to === 2000000
                  }
                  onChange={() => handleSalaryRangeChange(1500000, 2000000)}
                  className="text-gray-500 text-sm font-medium"
                />
                <RadioButton
                  id="more-than-20LPA"
                  name="salary-range"
                  value="More than ₹20 LPA"
                  label="More than ₹20 LPA"
                  checked={
                    safeFilters.salaryRange.from === 2000000 &&
                    safeFilters.salaryRange.to === 10000000000
                  }
                  onChange={() => handleSalaryRangeChange(2000000, 10000000000)}
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pr-4 border-b pb-4">
            <div className="py-4">
              <span className="font-bold">Work Mode</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Checkbox
                  label="On-site"
                  name="Onsite"
                  checked={safeFilters.workMode.includes("Onsite")}
                  onChange={() => handleWorkModeChange("Onsite")}
                  className="text-gray-500 text-sm font-medium"
                />
                <Checkbox
                  label="Hybrid"
                  name="Hybrid"
                  checked={safeFilters.workMode.includes("Hybrid")}
                  onChange={() => handleWorkModeChange("Hybrid")}
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
              <div className="flex justify-between">
                <Checkbox
                  label="Remote"
                  name="Remote"
                  checked={safeFilters.workMode.includes("Remote")}
                  onChange={() => handleWorkModeChange("Remote")}
                  className="text-gray-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarFilter;