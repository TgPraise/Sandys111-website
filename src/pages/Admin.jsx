import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { eventsStore, usingLocalDemoStore } from "../lib/eventsStore";
import { bookingsStore, usingLocalBookingsStore } from "../lib/bookingsStore";
import { ordersStore, usingLocalOrdersStore } from "../lib/ordersStore";
import { venueHireStore, usingLocalVenueHireStore } from "../lib/venueHireStore";
import { careersStore, usingLocalCareersStore } from "../lib/careersStore";
import { isEmailJsConfigured } from "../lib/emailClient";
import AdminLogin from "../components/admin/AdminLogin";
import EventForm from "../components/admin/EventForm";
import AdminEventRow from "../components/admin/AdminEventRow";
import AdminBookingRow from "../components/admin/AdminBookingRow";
import AdminOrderRow from "../components/admin/AdminOrderRow";
import AdminVenueHireRow from "../components/admin/AdminVenueHireRow";
import AdminCareerRow from "../components/admin/AdminCareerRow";
import ChangePasswordForm from "../components/admin/ChangePasswordForm";
import Eyebrow from "../components/ui/Eyebrow";

const TABS = ["Events", "Bookings", "Orders", "Venue Hire", "Careers"];

function EventsTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const refresh = async () => {
    setLoading(true);
    setEvents(await eventsStore.getAll());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async (event) => {
    setCreating(true);
    await eventsStore.create(event);
    await refresh();
    setCreating(false);
  };

  const handleToggleSoldOut = async (id, soldOut) => {
    await eventsStore.update(id, { soldOut });
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, soldOut } : e)));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event? This can't be undone.")) return;
    await eventsStore.remove(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div>
      {usingLocalDemoStore && (
        <div className="mb-8 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          Running in local demo mode — changes here only show on this
          browser, not to real site visitors, until Supabase is connected.
          See <code className="text-gold">ADMIN.md</code> for setup.
        </div>
      )}

      <h2 className="mb-4 text-xs uppercase tracking-widest text-paper-dim/60">
        Post a new event
      </h2>
      <EventForm onCreate={handleCreate} creating={creating} />

      <h2 className="mb-2 mt-14 text-xs uppercase tracking-widest text-paper-dim/60">
        Current events
      </h2>
      {loading ? (
        <p className="py-8 text-sm text-paper-dim">Loading…</p>
      ) : events.length === 0 ? (
        <p className="py-8 text-sm text-paper-dim">No events posted yet.</p>
      ) : (
        events.map((e) => (
          <AdminEventRow key={e.id} event={e} onToggleSoldOut={handleToggleSoldOut} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsStore.getAll().then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  const handleToggleContacted = async (id, contacted) => {
    await bookingsStore.update(id, { contacted });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, contacted } : b)));
  };

  return (
    <div>
      {usingLocalBookingsStore && (
        <div className="mb-8 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          Local demo mode — booking requests only show on this browser
          until Supabase is connected. See <code className="text-gold">ADMIN.md</code>.
        </div>
      )}
      <h2 className="mb-2 text-xs uppercase tracking-widest text-paper-dim/60">
        Booking requests
      </h2>
      {loading ? (
        <p className="py-8 text-sm text-paper-dim">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="py-8 text-sm text-paper-dim">No booking requests yet.</p>
      ) : (
        bookings.map((b) => (
          <AdminBookingRow key={b.id} booking={b} onToggleContacted={handleToggleContacted} />
        ))
      )}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersStore.getAll().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const handleToggleFulfilled = async (id, fulfilled) => {
    await ordersStore.update(id, { fulfilled });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, fulfilled } : o)));
  };

  return (
    <div>
      {usingLocalOrdersStore && (
        <div className="mb-8 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          Local demo mode — orders only show on this browser until Supabase
          is connected. See <code className="text-gold">ADMIN.md</code>.
        </div>
      )}
      <h2 className="mb-2 text-xs uppercase tracking-widest text-paper-dim/60">
        Delivery orders
      </h2>
      {loading ? (
        <p className="py-8 text-sm text-paper-dim">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="py-8 text-sm text-paper-dim">No orders yet.</p>
      ) : (
        orders.map((o) => (
          <AdminOrderRow key={o.id} order={o} onToggleFulfilled={handleToggleFulfilled} />
        ))
      )}
    </div>
  );
}

function VenueHireTab() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    venueHireStore.getAll().then((data) => {
      setEnquiries(data);
      setLoading(false);
    });
  }, []);

  const handleToggleContacted = async (id, contacted) => {
    await venueHireStore.update(id, { contacted });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, contacted } : e)));
  };

  return (
    <div>
      {usingLocalVenueHireStore && (
        <div className="mb-8 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          Local demo mode — enquiries only show on this browser until
          Supabase is connected. See <code className="text-gold">ADMIN.md</code>.
        </div>
      )}
      <h2 className="mb-2 text-xs uppercase tracking-widest text-paper-dim/60">
        Venue hire enquiries
      </h2>
      {loading ? (
        <p className="py-8 text-sm text-paper-dim">Loading…</p>
      ) : enquiries.length === 0 ? (
        <p className="py-8 text-sm text-paper-dim">No enquiries yet.</p>
      ) : (
        enquiries.map((e) => (
          <AdminVenueHireRow key={e.id} enquiry={e} onToggleContacted={handleToggleContacted} />
        ))
      )}
    </div>
  );
}

function CareersTab() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    careersStore.getAll().then((data) => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  const handleToggleReviewed = async (id, reviewed) => {
    await careersStore.update(id, { reviewed });
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, reviewed } : a)));
  };

  return (
    <div>
      {usingLocalCareersStore && (
        <div className="mb-8 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          Local demo mode — applications (including CVs) only show on this
          browser until Supabase is connected. See <code className="text-gold">ADMIN.md</code>.
        </div>
      )}
      <h2 className="mb-2 text-xs uppercase tracking-widest text-paper-dim/60">
        Job applications
      </h2>
      {loading ? (
        <p className="py-8 text-sm text-paper-dim">Loading…</p>
      ) : applications.length === 0 ? (
        <p className="py-8 text-sm text-paper-dim">No applications yet.</p>
      ) : (
        applications.map((a) => (
          <AdminCareerRow key={a.id} application={a} onToggleReviewed={handleToggleReviewed} />
        ))
      )}
    </div>
  );
}

function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [tab, setTab] = useState("Events");

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 pb-24 pt-28">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Admin</Eyebrow>
          <h1 className="font-display text-4xl text-cream">Dashboard</h1>
        </div>
        <button onClick={logout} className="text-sm text-paper-dim underline hover:text-cream">
          Log out
        </button>
      </div>

      <div className="mt-4">
        <ChangePasswordForm />
      </div>

      {!isEmailJsConfigured && (
        <div className="mt-6 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-light">
          Email notifications aren't connected yet — booking/order/enquiry
          requests currently open a pre-filled email on the guest's device
          instead of emailing you directly (job applications are saved
          either way, but a CV can't travel through mailto — always check
          the Careers tab). See <code className="text-gold">ADMIN.md</code> to set up EmailJS.
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-1 rounded-full border hairline-dark p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-gold text-charcoal" : "text-paper-dim hover:text-cream"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "Events" && <EventsTab />}
        {tab === "Bookings" && <BookingsTab />}
        {tab === "Orders" && <OrdersTab />}
        {tab === "Venue Hire" && <VenueHireTab />}
        {tab === "Careers" && <CareersTab />}
      </div>
    </div>
  );
}

export default function Admin() {
  const { authed } = useAdminAuth();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
