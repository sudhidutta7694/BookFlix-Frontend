<template>
  <div class="table-container overflow-x-auto max-w-full">
    <table class="table rounded-xl shadow-2xl min-w-[800px]">
      <thead class="rounded-t-xl sticky top-0 z-10">
        <tr class="bg-slate-900 font-bold text-xl text-gray-100">
          <!-- <th>City</th> -->
          <th class="min-w-[200px]">Language</th>
          <th class="min-w-[200px]">Movie</th>
          <th class="min-w-[200px]">Payment</th>
          <th class="min-w-[200px] h-10 overflow-y-auto">Total Seats</th>
          <th class="min-w-[300px]">Seats</th>
          <th class="min-w-[200px]">Theater Name</th>
          <th class="min-w-[200px]">City</th>
          <th class="min-w-[200px]">State</th>
          <th class="min-w-[200px]">Timing</th>
          <th class="min-w-[200px]">Day</th>
          <th class="min-w-[200px]">Date</th>
          <th class="min-w-[200px]">Token</th>
          <th class="min-w-[200px]">Receipt</th>
          <!-- <th>Booking Status</th> -->
        </tr>
      </thead>
      <tbody class="rounded-b-xl overflow-y-auto h-72">
        <tr class="text-green-100 bg-slate-600 font-mono text-lg" v-for="booking in sortedBookings" :key="booking.token">
          <td class="min-w-[200px]">{{ booking.language }}</td>
          <td class="min-w-[200px]">{{ booking.movie }}</td>
          <td class="min-w-[200px]">{{ booking.payment }}</td>
          <td class="min-w-[200px]">{{ booking.seatLength }}</td>
          <td class="min-w-[300px] h-10 overflow-y-auto">{{ formatSeats(booking.seats) }}</td>
          <td class="min-w-[200px]">{{ booking.theater.name }}</td>
          <td class="min-w-[200px]">{{ booking.city }}</td>
          <td class="min-w-[200px]">{{ booking.state }}</td>
          <td class="min-w-[200px]">{{ booking.theater.timing }}</td>
          <td class="min-w-[200px]">{{ booking.theater.day }}</td>
          <td class="min-w-[200px]">{{ booking.date }}</td>
          <td class="min-w-[200px]">{{ booking.token }}</td>
          <td class="min-w-[200px]"><button @click="generateAndDownloadInvoice(booking)"
              class="bg-red-700 px-3 py-2 font-mono text-center text-white text-lg rounded-lg hover:bg-red-600">
              Download
            </button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
// import PDFDocument from 'pdfkit';

export default {
  props: {
    bookingData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sortedBookings() {
      return this.bookingData.slice(0, 100).sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  methods: {
    formatSeats(seats) {
      // Filter and format seats starting with 'right' as 'R'
      const formattedSeats = seats.map(seat => {
        const parts = seat.split('-');
        if (parts[0].toLowerCase() === 'right') {
          return `R-${parts.slice(1).join('-')}`;
        } else if (parts[0].toLowerCase() === 'left') {
          return `L-${parts.slice(1).join('-')}`;
        }
        return seat;
      });

      // Return the seats as a comma-separated string
      return formattedSeats.join(', ');
    },
    async generateAndDownloadInvoice(booking) {
      const pdfBlob = await fetch('http://localhost:5173/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: booking }),
      }).then(response => response.blob());

      const fileName = `invoice_${booking.token}.pdf`;
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = fileName;
      a.click();

      URL.revokeObjectURL(pdfUrl); // Clean up the URL object
    },
  },
};
</script>

<style scoped>
.table-container {
  max-width: 100%;
  width: 80vw;
  height: 300px;
}

.table {
  /* width: 100%; */
  /* border-collapse: collapse; */
  border-radius: 16px;
}

tbody tr:nth-child(even) {
  background-color: rgb(51 65 85);
}

th,
td {
  padding: 12px;
  text-align: center;
}

th {
  font-size: 16px;
  font-weight: bold;
}

td {
  font-size: 16px;
}
</style>