<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $full_name = $_POST['full_name'];
    $dob = $_POST['dob'];
    $nationality = $_POST['nationality'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $occupation = $_POST['occupation'];
    $company = $_POST['company'];
    $industry = implode(", ", $_POST['industry']);
    $experience_level = $_POST['experience_level'];
    $certifications = $_POST['certifications'];
    $proposed_sector = implode(", ", $_POST['proposed_sector']);
    $type_of_contribution = implode(", ", $_POST['contribution']);
    $preferred_mode_of_collaboration = implode(", ", $_POST['collaboration_mode']);
    $comments = $_POST['comments'];

    // Prepare data for CSV
    $data = [
        $full_name,
        $dob,
        $nationality,
        $contact_number,
        $email,
        $address,
        $occupation,
        $company,
        $industry,
        $experience_level,
        $certifications,
        $proposed_sector,
        $type_of_contribution,
        $preferred_mode_of_collaboration,
        $comments,
    ];

    // Specify the CSV file
    $file = 'members.csv';

    // Open the file for appending
    $handle = fopen($file, 'a');
    if ($handle) {
        // Write data to CSV
        fputcsv($handle, $data);
        fclose($handle);
        echo "Data saved successfully!";
    } else {
        echo "Error opening the file.";
    }
}
?>
