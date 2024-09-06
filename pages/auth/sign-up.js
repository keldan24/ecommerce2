"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
// import Layout from '../../components/layout';
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    gender: '',
    country: '',
    // state: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [phone, setPhone] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false);
  const [countryDialogOpen, setCountryDialogOpen] = useState(false);
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
  if (status === "loading") {
    return <div>Loading...</div>;
  }});

  useEffect(() => {
  if (!session) {
    return null;
  }});

  // console.log(phone);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        if (response.data && response.data.data) {
          setCountries(response.data.data);
        } else {
          console.error('Unexpected API response structure:', response.data);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.country) {
        const data = { "country": formData.country };
        try {
          const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', data);
          if (response.data && response.data.data && response.data.data.states) {
            const stateNames = response.data.data.states.map(state => state.name.replace(/ State$/, ''));
            setCities(stateNames);
          } else {
            console.error('Unexpected API response structure:', response.data);
          }
        } catch (err) {
          console.error('Error fetching cities:', err);
        }
      }
    };

    fetchCities();
  }, [formData.country]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Combine phoneCode and phoneNumber with a space in between
    const combinedPhone = `${updatedFormData.phoneCode} ${updatedFormData.phoneNumber}`;
    setPhone(combinedPhone);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const resUserExists = await fetch("/api/userAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }), // Ensure email is from formData
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User email already exists.");
        return;
      }

      // Register the new user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: phone,
          email: formData.email,
          gender: formData.gender,
          country: formData.country,
          city: formData.city,
          password: formData.password
        }),
      });

      if (res.ok) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneCode: '',
          phoneNumber: '',
          gender: '',
          country: '',
          city: '',
          password: '',
          confirmPassword: '',
        });
        setSuccess('User registration successful.');
        router.push("/auth/login");
      } else {
        const result = await res.json();
        setError(result.message || "User registration failed.");
      }
    } catch (error) {
      setError("Error during registration: " + error.message);
    } finally {
      setLoading(false);
    }
  };



  const handleOpenDialog = (type) => {
    setDialogType(type);
    if (type === 'city') {
      setCityDialogOpen(true);
    } else if (type === 'country') {
      setCountryDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setCountryDialogOpen(false);
    setCityDialogOpen(false);
  };

  const handleSelectCountry = (country) => {
    setFormData({ ...formData, country, city: '' });
    setSelectedCountry(country);
    setCities([])
    setCountryDialogOpen(false);
    setCityDialogOpen(false);
  };

  const handleSelectCity = (city) => {
    setFormData({ ...formData, city });
    setCityDialogOpen(false);
  };

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Phone</label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="phoneCode"
                      className="form-control"
                      value={formData.phoneCode}
                      onChange={handleChange}
                      placeholder="+1"
                      style={{ maxWidth: '80px' }}
                      maxLength={6}
                    />
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      maxLength={11}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === 'Female'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={formData.country}
                    onChange={(e) => e.target.value = formData.country}
                    onClick={() => handleOpenDialog('country')}
                    placeholder="Select Country"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={formData.city}
                    onChange={(e) => e.target.value = formData.city}
                    onClick={() => handleOpenDialog('city')}
                    placeholder="Select City"
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled={!formData.country}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="text-muted bg-light rounded p-3 border small">
                    By clicking the &lsquo;<b>Register</b>&lsquo; button, you confirm
                    that you accept our{' '}
                    <a href="#">Terms of use and Privacy Policy</a>.
                  </div>
                </div>
              </form>
              <hr className="text-muted" />
              <div className="text-center">
                Already have an account?{' '}
                <Link href="/auth/login">
                  <a className="text-decoration-none fw-medium">Login</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Dialog */}
      <Dialog style={{ maxHeight: '600px', margin: 'auto' }} open={countryDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select Country</DialogTitle>
        <DialogContent>
          <List>
            {countries.map((item, i) => (
              <ListItem button key={i} onClick={() => handleSelectCountry(item.country)}>
                <ListItemText primary={item.country} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* City Dialog */}
      <Dialog style={{ maxHeight: '600px', margin: 'auto', minWidth: '500px' }} open={cityDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select City</DialogTitle>
        <DialogContent>
          <List>
            {cities.map((city, i) => (
              <ListItem button key={i} onClick={() => handleSelectCity(city)}>
                <ListItemText primary={city} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SignUp.simpleHeader = true;
SignUp.hideAuth = true;

export default SignUp;
