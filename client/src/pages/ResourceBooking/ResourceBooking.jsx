import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import BookingStats from "../../components/booking/BookingStats";
import BookingFilters from "../../components/booking/BookingFilters";
import BookingTable from "../../components/booking/BookingTable";
import BookResourceModal from "../../components/booking/BookResourceModal";

function ResourceBooking() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [availableAssets, setAvailableAssets] = useState([]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/bookings");
      if (response.success) {
        setBookings(response.data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch resource bookings", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await apiClient.get("/assets");
      if (response.success) {
        setAvailableAssets(response.data.items || response.data.assets || []);
      }
    } catch (err) {
      console.error("Failed to fetch assets for booking", err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchAssets();
  }, []);

  const handleBookResource = async (data) => {
    try {
      const response = await apiClient.post("/bookings", data);
      if (response.success) {
        setIsBookModalOpen(false);
        fetchBookings();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book resource");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Resource Booking
        </h1>

        <p className="mt-2 text-slate-500">
          Book and manage organizational resources.
        </p>
      </div>

      <BookingStats bookings={bookings} />

      <BookingFilters onBookClick={() => setIsBookModalOpen(true)} />

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading bookings...</div>
      ) : (
        <BookingTable bookings={bookings} />
      )}
      
      <BookResourceModal 
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSave={handleBookResource}
        resources={availableAssets}
      />
    </div>
  );
}

export default ResourceBooking;