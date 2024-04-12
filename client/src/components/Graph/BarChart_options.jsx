export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 30,
        },
      },
    },
    title: {
      display: true,
      text: "กราฟแสดงยอดขาย ร้าน้ำยาปูแม่ศรี",
      font: {
        size: 40, // Adjust the font size here
      },
    },
    tooltip: {
      padding: 20, // Adjust the padding of the tooltip here,
      titleFont: {
        size: 50
      },
      bodyFont: {
        size: 40, // Adjust the font size of the tooltip body here
      },
    },
  },
  maintainAspectRatio: false, // Set to false to adjust both width and height
  layout: {
    padding: {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
    },
  },
  scales: {
    y: {
      ticks: {
        font: {
          size: 30, // Adjust the font size for the y-axis ticks
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 30, // Adjust the font size for the x-axis ticks
        },
      },
    },
  },
};
