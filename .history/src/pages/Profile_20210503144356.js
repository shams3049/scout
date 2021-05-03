import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSession } from '../firebase/UserProvider';
import { firestore } from '../firebase/config';
import { updateUserDocument } from '../firebase/user';
import { ProfileImage } from '../ProfileImage';

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const docRef = firestore.collection('users').doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
        const formData = Object.entries(documentData).map((entry) => ({
          [entry[0]]: entry[1],
        }));

        setValue(formData);
      }
    });
    return unsubscribe;
  }, [user.uid, setValue, params.id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUserDocument({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!userDocument) {
    return null;
  }

  const formClassname = `ui big form twelve wide column ${isLoading ? 'loading' : ''}`;

  return (
    <div
      className="add-form-container"
      style={{ maxWidth: 960, margin: '50px auto' }}
    >
      <div className="ui grid stackable">
        <ProfileImage id={params.id} />
        <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
          <div className="fields">
            <div className="eight wide field">
              <label>
                Name
                <input type="text" name="name" {...register('name')} />
              </label>
            </div>
            <div className="eight wide field">
              <label>
                Email
                <input type="text" name="email" disabled r{...register('email')} />
              </label>
            </div>
          </div>
          <div className="fields">
            <div className="six wide field">
              <label>
                Address
                <input type="text" name="address" {...register('address')} />
              </label>
            </div>
            <div className="five wide field">
              <label>
                City
                <input type="text" name="city" {...register('city')} />
              </label>
            </div>
            <div className="two wide field">
              <label>
                State
                <input type="text" name="state" {...register('state')} />
              </label>
            </div>
            <div className="three wide field">
              <label>
                Zip
                <input type="text" name="zip" {...register('zip')} />
              </label>
            </div>
          </div>
          <div className="equal width fields">
            <div className="field">
              <label>
                Phone
                <input type="text" name="phone" {...register('phone')} />
              </label>
            </div>
            <div className="field">
              <label>
                Specialty
                <select className="specialty" name="specialty" {...register('specialty')}>
                  <option value="consultant">Consultant</option>
                  <option value="scouting manager">Scouting Manger</option>
                  <option value="scouting agent">Scouting Agent</option>
                </select>
              </label>
            </div>
            <div className="field">
              <label>
                ip
                <input type="text" name="ip" {...register('ip')} />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="ui submit large grey button right floated"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;