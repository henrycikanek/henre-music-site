import Layout from "@/components/Layout";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import { services, formatPrice } from "@/data/services";

export default function SubmitProject() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    artistName: "",
    serviceType: "mix",
    message: "",
  });

  useEffect(() => {
    const serviceParam = router.query.service;
    if (typeof serviceParam === "string" && services.some((s) => s.id === serviceParam)) {
      setForm((prev) => ({ ...prev, serviceType: serviceParam }));
    }
  }, [router.query.service]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedService = services.find((s) => s.id === form.serviceType);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      const { projectId } = await res.json();
      router.push(
        `/submit/upload?projectId=${projectId}&service=${form.serviceType}`
      );
    } catch {
      setError("Something went wrong. Please try again or email cikanekmgmt@gmail.com directly.");
      setIsSubmitting(false);
    }
  };

  const grouped = services.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s);
      return acc;
    },
    {} as Record<string, typeof services>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form — left 3 cols */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold text-accent mb-8 tracking-wide">
              SUBMIT A PROJECT
            </h1>

            {error && (
              <div className="bg-red-800/40 border border-red-700 text-white p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name row */}
              <div>
                <p className="font-medium mb-1">Name</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      First Name <span className="text-white/40">(required)</span>
                    </label>
                    <input
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1">
                      Last Name <span className="text-white/40">(required)</span>
                    </label>
                    <input
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Email <span className="text-white/40">(required)</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Artist Name</label>
                <p className="text-sm text-white/50 mb-1">
                  Spelling and capitalization as you would like it to appear.
                </p>
                <input
                  value={form.artistName}
                  onChange={(e) =>
                    setForm({ ...form, artistName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Service Type <span className="text-white/40">(required)</span>
                </label>
                <select
                  required
                  value={form.serviceType}
                  onChange={(e) =>
                    setForm({ ...form, serviceType: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {Object.entries(grouped).map(([category, items]) => (
                    <optgroup key={category} label={category}>
                      {items.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {formatPrice(s.price)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Message <span className="text-white/40">(required)</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <p className="text-sm text-white/50 uppercase tracking-wide">
                You can submit your files on the next page
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 font-semibold rounded-md border-2 border-accent transition-colors ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-accent hover:text-gray-900"
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : "SEND EMAIL → SUBMIT FILES"}
              </button>
            </form>
          </div>

          {/* Pricing sidebar — right 2 cols */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-accent mb-8 tracking-wide">
              PRICING
            </h2>

            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-bold text-white/90 uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {items.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, serviceType: s.id })
                      }
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        form.serviceType === s.id
                          ? "bg-accent/10 border border-accent/30"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span className="text-white/80">{s.name}</span>
                      <span className="float-right font-bold">
                        {formatPrice(s.price)} / song
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm">
                Discounts available for albums. Contact for custom quotes on
                larger projects.
              </p>
            </div>

            {selectedService && (
              <div className="mt-6 bg-gray-900 rounded-lg p-4 border border-white/10">
                <p className="text-sm text-white/50 uppercase tracking-wide mb-1">
                  Selected
                </p>
                <p className="font-bold text-lg">{selectedService.name}</p>
                <p className="text-accent text-xl font-bold">
                  {formatPrice(selectedService.price)}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  {selectedService.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
