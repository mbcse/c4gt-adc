import React, { useEffect, useState } from "react";
import { useApi } from "@/api/index";
import { useToast } from "@/student/hooks/use-toast";
import { Button } from "@/student/components/ui/button";

export function ProfileForm() {
  const api = useApi();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/users/profile");
        setName(res.data.user.name || "");
        setEmail(res.data.user.email || "");
      } catch (err) {
        console.error("Failed to load profile", err);
        toast.error({
          title: "Error",
          description: "Failed to load profile",
        });
      }
    }
    fetchProfile();
  }, [api, toast]);

  const onSave = async () => {
    setLoading(true);
    try {
      await api.put("/users/profile", { name, email });
      toast.success({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (err: any) {
      toast.error({
        title: "Error",
        description: err.response?.data?.error || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <label className="block mb-3">
        <span className="text-gray-700">Full Name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
          disabled={loading}
        />
      </label>
      <label className="block mb-6">
        <span className="text-gray-700">Email Address</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
          disabled={loading}
        />
      </label>
      <Button onClick={onSave} disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
