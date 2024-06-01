import { BookingService } from "../services/index.js"

import dayjs from 'dayjs';

export const getTop10Lessees = async (req, res) => {
    try {
        const today = dayjs().endOf('day');
        const lastWeek = today.subtract(7, 'day').startOf('day');
        const result = await BookingService.getAllBooking([
            {
                $match: {
                    createdAt: {
                        $gte: lastWeek.toDate(),
                        $lte: today.toDate()
                    }
                }
            },
            {
                $group: {
                    _id: '$lessee',
                    totalPrice: { $sum: '$price' }
                }
            },
            {
                $sort: { totalPrice: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'lesseeDetails'
                }
            },
            {
                $unwind: '$lesseeDetails'
            },
            {
                $project: {
                    _id: 0,
                    lesseeId: '$_id',
                    totalPrice: 1,
                    lesseeDetails: {
                        name: '$lesseeDetails.name',
                        email: '$lesseeDetails.email'
                    }
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export default {
    getTop10Lessees,
}
