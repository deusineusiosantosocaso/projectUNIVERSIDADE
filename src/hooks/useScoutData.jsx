import { useState, useEffect } from 'react';
import api from '../services/api';


export const useGenders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await api.get('/Gender');
        setGenders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGenders();
  }, []);

  return { genders, loading, error };
};

export const useCivilStatus = () => {
  const [civilStatus, setCivilStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCivilStatus = async () => {
      try {
        const response = await api.get('/CivilStatus');
        setCivilStatus(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCivilStatus();
  }, []);

  return { civilStatus, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/Category');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useProvinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await api.get('/Province');
        setProvinces(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return { provinces, loading, error };
};

export const useGroupings = () => {
  const [groupings, setGroupings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupings = async () => {
      try {
        const response = await api.get('/Grouping');
        setGroupings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGroupings();
  }, []);

  return { groupings, loading, error };
};

export const useGender = () => {
    const [gender, setGender] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchGender = async () => {
        try {
          const response = await api.get('/Gender');
          setGender(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchGender();
    }, []);
  
    return { gender, loading, error };
  };

  export const useCourse = () => {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await api.get('/Course');
          setCourse(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, []);
  
    return { course, loading, error };
  };

  export const useActivity = () => {
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await api.get('/Activity');
          setActivity(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, []);
  
    return { activity, loading, error };
  };



  export const useScout = () => {
    const [scout, setScout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await api.get('/Scout');
          setScout(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, []);
  
    return { scout, loading, error };
  };

