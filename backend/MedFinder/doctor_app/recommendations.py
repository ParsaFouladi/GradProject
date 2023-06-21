from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from .models import Doctor, Department

def get_doctor_features(doctor):
    department = Department.objects.get(id=doctor.department_id)
    return [department.name, doctor.speciality, doctor.country, doctor.average_rating]

def get_doctor_recommendations(doctor_id):
    target_doctor = Doctor.objects.get(id=doctor_id)
    target_features = get_doctor_features(target_doctor)

    doctors = Doctor.objects.all()
    doctor_features = [get_doctor_features(doctor) for doctor in doctors]

    # Normalize the features to have the same scale
    scaler = MinMaxScaler()
    doctor_features = scaler.fit_transform(doctor_features)

    # Calculate the similarity between the target doctor and all doctors
    similarities = cosine_similarity([target_features], doctor_features)

    # Get the indices of the doctors sorted by their similarity to the target doctor
    sorted_indices = similarities.argsort()[0]

    # Return the top 8 most similar doctors, excluding the target doctor itself
    recommended_doctors = [doctors[i] for i in sorted_indices if i != doctor_id][:8]

    return recommended_doctors
