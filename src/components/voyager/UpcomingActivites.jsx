import React, { useState, useEffect, use } from "react";
import { useVoyagerContext } from "../../context/VoyagerContext";
import VoyagerNavbar from "./VoyagerNavbar";
import { FiCalendar, FiClock } from "react-icons/fi";
import {useNavigate } from "react-router-dom";

const UpcomingActivites = () => {
      const [upcomingActivities, setUpcomingActivities] = useState([]);
      const { activities, fetchActivities } = useVoyagerContext();
      const Navigate = useNavigate();

      const transformActivities = (activities) => {
            const simplified = activities.map((activity, index) => ({
                  id: index + 1,
                  name: activity.name,
                  time: activity.time.split(" - ")[0],
                  location: activity.location,
                  date: activity.date,
            }));
            setUpcomingActivities(simplified);
      };

      useEffect(() => {
            fetchActivities(); // triggers context to fetch data and update `activities`
      }, []);

      useEffect(() => {
            if (activities && activities.length > 0) {
                  transformActivities(activities); // only when activities are available
            }
      }, [activities]);

      return (
            <>
                  <VoyagerNavbar />
                  <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-xl font-semibold text-gray-800">
                                    Upcoming Activities
                              </h2>
                        </div>
                        <div className="space-y-4">
                              {upcomingActivities.map((activity) => (
                                    <div
                                          key={activity.id}
                                          className="border-l-4 border-blue-500 pl-4 py-2"
                                          onClick={() =>
                                                Navigate(`/voyager/activities`)
                                          }
                                    >
                                          <div className="flex justify-between">
                                                <h3 className="font-medium text-gray-800">
                                                      {activity.name}
                                                </h3>
                                                <span className="text-sm text-gray-500">
                                                      {activity.date}
                                                </span>
                                          </div>
                                          <div className="flex items-center mt-1 text-sm text-gray-600">
                                                <FiClock className="mr-1" />
                                                <span>{activity.time}</span>
                                                <span className="mx-2">•</span>
                                                <span>{activity.location}</span>
                                          </div>
                                    </div>
                              ))}
                        </div>
                        {upcomingActivities.length === 0 && (
                              <div className="p-6 text-center">
                                    <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                          No upcoming activities
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                          Your activity schedule will appear
                                          here once you book an activity.
                                    </p>
                              </div>
                        )}
                  </div>
            </>
      );
};

export default UpcomingActivites;
