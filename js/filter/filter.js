import numFilter from './numFilter'
import strFilter from './strFilter'
import dateFilter from './dateFilter'
export default {
    ...numFilter,
    ...strFilter,
    ...dateFilter,
}