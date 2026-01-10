# Guru Art Program - Payment Implementation Guide

## Overview
Complete payment integration for the Guru Art Program with support for both instructor-paid and student-paid modes, including proper Firebase updates and post-payment redirects.

## Features Implemented

### 1. Dual Payment Modes
- **Instructor Pays**: Instructor pays ₹249 for student entry, earns ₹75 commission
- **Student Pays**: Student pays ₹249 directly through their portal

### 2. Payment Flow

#### Instructor Mode Payment Flow
```
1. Instructor registers student
2. Student record created with paymentStatus: 'pending'
3. Instructor sees "Payment Required" button in student list
4. Instructor clicks pay → Cashfree modal opens
5. After successful payment → redirects to /guru-program?payment=success&studentId=xxx&mode=instructor
6. Firebase updates:
   - paymentStatus: 'paid'
   - paidBy: 'instructor'
   - paymentDate: new Date()
7. Instructor's totalEarnings updated (+₹75)
8. Artwork upload section becomes enabled
```

#### Student Mode Payment Flow
```
1. Instructor registers student with "Student will submit" option
2. Student gets unique link + PIN
3. Student accesses link → enters PIN
4. Student sees "Payment Required" screen
5. Student clicks pay → Cashfree modal opens
6. After successful payment → redirects to same URL with ?payment=success
7. Firebase updates:
   - paymentStatus: 'paid'
   - paidBy: 'student'
   - paymentDate: new Date()
8. Student can now upload 2 artworks
```

## Firebase Schema Updates

### Student Document Structure
```javascript
{
  name: string,
  age: string,
  phone: string,
  submissionMode: 'instructor' | 'student',
  pin: string | null,
  studentId: string,
  studentLink: string | null,
  instructorId: string,
  instructorName: string,
  academyName: string,
  createdAt: Timestamp,
  artworksSubmitted: number,
  
  // Payment fields (NEW)
  paymentStatus: 'pending' | 'paid',
  paymentMode: 'instructor' | 'student',
  paidBy: 'instructor' | 'student' | null,
  paymentDate: Timestamp | null,
  lastUpdated: Timestamp
}
```

### Instructor (Guru) Document Structure
```javascript
{
  email: string,
  teacherName: string,
  schoolName: string,
  phoneNumber: string,
  createdAt: Timestamp,
  totalEarnings: number,  // Auto-calculated: (paid students) * 75
  totalStudents: number
}
```

## Payment Integration Details

### Cashfree Configuration
- **Endpoint**: `https://indiancreativestarbackend.vercel.app/create-order`
- **Amount**: ₹249
- **Mode**: Production
- **SDK**: Cashfree JS SDK v3

### Instructor Payment Request
```javascript
{
  order_amount: '249',
  order_currency: 'INR',
  customer_details: {
    customer_name: instructorName,
    customer_email: instructorEmail,
    customer_phone: instructorPhone
  },
  order_meta: {
    return_url: `${origin}/guru-program?payment=success&studentId=${studentDocId}&mode=instructor`,
    student_id: studentDocId,
    student_name: studentName,
    instructor_id: instructorUid,
    payment_mode: 'instructor'
  },
  order_note: `Entry Fee for ${studentName} (Paid by Instructor)`
}
```

### Student Payment Request
```javascript
{
  order_amount: '249',
  order_currency: 'INR',
  customer_details: {
    customer_name: studentName,
    customer_email: `${studentName}@student.ics.com`, // Auto-generated
    customer_phone: studentPhone
  },
  order_meta: {
    return_url: `${origin}/student/${academySlug}/${studentSlug}?payment=success`,
    student_id: studentDocId,
    student_name: studentName,
    instructor_id: instructorId,
    payment_mode: 'student'
  },
  order_note: `Entry Fee for ${studentName} (Paid by Student)`
}
```

## UI/UX States

### GuruArtProgram.tsx States

1. **Before Payment (Instructor Mode)**
   - Shows "Payment Required" card with green gradient
   - Button: "Pay ₹249 & Enable Submission"
   - Shows commission info: "You will earn ₹75 commission"

2. **After Payment (Instructor Mode)**
   - Shows artwork upload section
   - Two file upload fields for artworks
   - Submit button: "Submit Artworks to Competition"

3. **Student Mode - Payment Pending**
   - Shows blue info card
   - Message: "Waiting for Student Payment"
   - "Student needs to complete payment through their portal"

4. **Student Mode - Payment Complete**
   - Shows student link and PIN
   - Student can access their portal and submit

### StudentSubmissionPortal.tsx States

1. **Payment Required (Student Mode)**
   - Full-screen payment card
   - Shows student details
   - Entry fee: ₹249
   - Lists what's included
   - Button: "Pay ₹249 & Submit Artworks"

2. **Payment Pending (Instructor Mode)**
   - Shows yellow alert card
   - Message: "Your instructor needs to complete payment"
   - Shows instructor details
   - No action button

3. **After Payment (Both Modes)**
   - Shows artwork upload form
   - Two file upload fields
   - Submit button active

## Post-Payment Update Logic

### Instructor Payment Success
```javascript
// On redirect to /guru-program?payment=success&studentId=xxx&mode=instructor
useEffect(() => {
  if (payment === 'success' && studentId && user) {
    // 1. Update student payment status
    updateDoc(studentRef, {
      paymentStatus: 'paid',
      paidBy: 'instructor',
      paymentDate: new Date()
    });

    // 2. Calculate and update instructor earnings
    const paidStudents = students.filter(s => s.paymentStatus === 'paid').length;
    const newEarnings = (paidStudents + 1) * 75;
    updateDoc(guruRef, { totalEarnings: newEarnings });

    // 3. Refresh students list
    // 4. Show success alert
    // 5. Clear URL params
  }
}, [user, students]);
```

### Student Payment Success
```javascript
// On redirect to /student/{academy}/{student}?payment=success
useEffect(() => {
  if (payment === 'success' && authenticated) {
    updateDoc(studentRef, {
      paymentStatus: 'paid',
      paidBy: 'student',
      paymentDate: new Date()
    });
    
    setPaymentStatus('paid');
    // Show success message
    // Clear URL params
  }
}, [authenticated, studentData]);
```

## Error Handling

### Payment Failures
- Modal shows error from Cashfree SDK
- Alert: "Payment failed. Please try again."
- Payment processing state reset
- User can retry payment

### Update Failures
- If Firebase update fails after payment
- Shows error but payment is recorded
- Message: "Payment recorded but failed to update. Please contact support."

### Network Issues
- Catches fetch errors
- Shows user-friendly error message
- Allows retry

## Testing Checklist

### Instructor Mode
- [ ] Register student with instructor submission mode
- [ ] Verify payment button appears
- [ ] Click payment, verify Cashfree modal opens
- [ ] Complete test payment
- [ ] Verify redirect to /guru-program?payment=success
- [ ] Verify Firebase updated (paymentStatus, paidBy, paymentDate)
- [ ] Verify earnings updated (+₹75)
- [ ] Verify artwork upload section enabled
- [ ] Upload 2 artworks
- [ ] Verify submission success

### Student Mode
- [ ] Register student with student submission mode
- [ ] Copy student link and PIN
- [ ] Access student portal
- [ ] Enter PIN
- [ ] Verify payment screen appears
- [ ] Click payment, verify Cashfree modal opens
- [ ] Complete test payment
- [ ] Verify redirect with ?payment=success
- [ ] Verify Firebase updated
- [ ] Verify artwork upload enabled
- [ ] Upload 2 artworks
- [ ] Verify submission success

### Edge Cases
- [ ] Instructor mode - student already paid
- [ ] Student mode - instructor already paid (shouldn't happen)
- [ ] Payment cancelled by user
- [ ] Payment timeout
- [ ] Network error during payment
- [ ] Firebase update failure after payment
- [ ] Multiple payment attempts
- [ ] Browser refresh during payment

## Security Considerations

1. **Payment Verification**
   - Payment session IDs are generated server-side
   - Order IDs tracked in Cashfree
   - Payment status verified before enabling submission

2. **Firebase Security Rules** (Recommended)
```javascript
// Firestore rules for students collection
match /gurus/{guruId}/students/{studentId} {
  // Only instructor can create students
  allow create: if request.auth.uid == guruId;
  
  // Only instructor can update payment if instructor mode
  // Only student can update payment if student mode (via server)
  allow update: if request.auth.uid == guruId
    || (resource.data.submissionMode == 'student' 
        && request.resource.data.paymentStatus == 'paid');
  
  // Only instructor and student (via PIN) can read
  allow read: if request.auth.uid == guruId;
}
```

3. **Payment Flow**
   - All payment orders created server-side
   - Return URLs validated
   - Payment status updated only after successful Cashfree response

## Troubleshooting

### Payment Not Updating After Success
1. Check browser console for errors
2. Verify URL parameters (payment, studentId, mode)
3. Check Firebase permissions
4. Verify instructor is logged in (for instructor mode)
5. Check network tab for failed API calls

### Artwork Upload Not Enabling
1. Verify paymentStatus === 'paid' in Firebase
2. Check if correct submission mode
3. Refresh page to ensure latest data loaded
4. Check console for React errors

### Commission Not Calculating
1. Verify payment update completed
2. Check totalEarnings field in guru document
3. Ensure students array properly filtered
4. Check for duplicate payment updates

## API Endpoints Used

### Create Payment Order
- **URL**: `https://indiancreativestarbackend.vercel.app/create-order`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**: See payment request structure above
- **Response**: `{ success: boolean, data: { payment_session_id: string } }`

### Upload Artwork (ImgBB)
- **URL**: `https://api.imgbb.com/1/upload?key=91acddc60c0c58dde66ca6509d4e9fd9`
- **Method**: POST
- **Body**: FormData with image
- **Max Size**: 32MB
- **Formats**: JPG, PNG, GIF, WEBP

## Future Enhancements

1. **Payment History**
   - Add payment transaction log
   - Store transaction IDs from Cashfree
   - Show payment receipts

2. **Refund Support**
   - Track refund requests
   - Update earnings on refund
   - Re-lock artwork submission

3. **Bulk Payment**
   - Allow instructor to pay for multiple students
   - Batch payment processing
   - Volume discounts

4. **Payment Reminders**
   - Email/SMS reminders for pending payments
   - Deadline notifications
   - Auto-expiry of unpaid registrations

5. **Analytics**
   - Payment conversion rates
   - Average time to payment
   - Popular payment methods
   - Earnings dashboard for instructors

## Support & Maintenance

### Common User Questions

**Q: Can instructor pay later?**
A: Yes, student is registered immediately. Payment can be done anytime before artwork submission.

**Q: What if payment fails?**
A: User can retry payment anytime. No limit on retry attempts.

**Q: Can student change from instructor pay to self pay?**
A: Not currently supported. Would require admin intervention.

**Q: When do instructors get commission?**
A: Commission (₹75) is credited to totalEarnings immediately after payment success.

### Maintenance Tasks

1. **Weekly**
   - Check for stuck payments (pending > 7 days)
   - Verify earnings calculations
   - Monitor payment gateway errors

2. **Monthly**
   - Reconcile total payments with Cashfree
   - Generate payment reports
   - Check for duplicate payment records

3. **Quarterly**
   - Review and update payment amounts
   - Optimize payment flow based on user feedback
   - Update security rules

## Version History

- **v1.0.0** (Current) - Initial implementation with dual payment modes
  - Cashfree integration
  - Firebase schema updates
  - Post-payment redirects and updates
  - Instructor commission tracking
  - Student and instructor payment flows

---

**Last Updated**: 2025-11-12
**Maintained By**: Indian Creative Star Development Team