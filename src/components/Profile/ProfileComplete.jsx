import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { updateProfile } from "../../service/userService";
import { getTags } from "../../service/tagsServices";

export default function CompleteProfile() {
  const { user, setUser } = useContext(UserContext);

  const [tags, setTags] = useState([]);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [form, setForm] = useState({
    bio: "",
    city: "",
    country: "",
    instagram: "",
    youtube: "",
    soundcloud: "",
    website: "",
    skills: [],
    profile_image: null,
  });

  // Load user + tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const t = await getTags();
        setTags(t);
      } catch (err) {
        console.error("Error loading tags:", err);
      }
    };

    fetchTags();

    if (user) {
      setForm({
        bio: user.bio || "",
        city: user.city || "",
        country: user.country || "",
        instagram: user.instagram || "",
        youtube: user.youtube || "",
        soundcloud: user.soundcloud || "",
        website: user.website || "",
        skills: user.skills || [],
        profile_image: null,
      });

      if (user.profile_image) {
        setProfileImagePreview(user.profile_image);
      }
    }
  }, [user]);

  // Generic input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profile_image: file });
    setProfileImagePreview(URL.createObjectURL(file));
  };

  // Handle multiselect tag selection
  const handleSkills = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, skills: values });
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      if (key === "skills") {
        form.skills.forEach((skillId) => formData.append("skills", skillId));
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const updated = await updateProfile(formData, true);
      setUser(updated);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Complete Your Profile</h2>

      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Image */}
          <div style={styles.imageContainer}>
            <img
              src={profileImagePreview || "/default-avatar.png"}
              alt="Preview"
              style={styles.profileImage}
            />
            <label style={styles.uploadButton}>
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {/* Bio */}
          <label style={styles.label}>Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Tell us about yourself..."
          />

          {/* Location */}
          <div style={styles.flexRow}>
            <div style={styles.flexCol}>
              <label style={styles.label}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                style={styles.input}
                placeholder="City"
              />
            </div>

            <div style={styles.flexCol}>
              <label style={styles.label}>Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                style={styles.input}
                placeholder="Country"
              />
            </div>
          </div>

          {/* Skills */}
          <label style={styles.label}>Skills / Tags</label>
          <select
            multiple
            value={form.skills}
            onChange={handleSkills}
            style={styles.multiSelect}
          >
            {tags.map((tag) => (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          {/* Social Links */}
          <label style={styles.label}>Instagram</label>
          <input
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            style={styles.input}
            placeholder="Instagram URL"
          />

          <label style={styles.label}>YouTube</label>
          <input
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            style={styles.input}
            placeholder="YouTube URL"
          />

          <label style={styles.label}>SoundCloud</label>
          <input
            name="soundcloud"
            value={form.soundcloud}
            onChange={handleChange}
            style={styles.input}
            placeholder="SoundCloud URL"
          />

          <label style={styles.label}>Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            style={styles.input}
            placeholder="Personal Website"
          />

          <button type="submit" style={styles.saveButton}>
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

// Inline styles (clean + modern)
const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "20px",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginTop: "15px",
    fontWeight: 600,
    marginBottom: "5px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "80px",
    fontSize: "14px",
  },
  flexRow: {
    display: "flex",
    gap: "10px",
  },
  flexCol: {
    flex: 1,
  },
  multiSelect: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "80px",
    fontSize: "14px",
  },
  imageContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    border: "2px solid #ddd",
  },
  uploadButton: {
    display: "inline-block",
    padding: "8px 16px",
    background: "#eee",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveButton: {
    marginTop: "25px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
