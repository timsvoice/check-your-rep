import rp from 'request-promise';

const GOOGLE_CIVIC_KEY = process.env.GOOGLE_CIVIC_KEY;
const googleUrl = `https://www.googleapis.com/civicinfo/v2/representatives`;

// Google Civic

module.exports.reps = {
  /**
   * Get the Reps for a zip code
   * @param {string} zip_code Zip code to search for
   **/
  get(zip_code) {
    return new Promise((resolve, reject) => {
      rp(`${googleUrl}?address=${zip_code}&key=${GOOGLE_CIVIC_KEY}`)
        .then((res) => JSON.parse(res))
        .then((res) => {
          // offices[{index:x}]
          // officesrs[x]
          res.offices = res.offices.map((office, idx, arr) => {
            office.officials = [];
            office.officialIndices.forEach((index) => {
              office.officials.push(res.officials[index]);
            })
            return office;
          })
          resolve(res);
        })
        .catch((err) => { throw err})
    });
  },
}
