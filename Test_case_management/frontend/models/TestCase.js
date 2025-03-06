const TestCaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Passed', 'Failed', 'In Progress'], default: 'In Progress' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  });
  
  const TestCase = mongoose.models.TestCase || mongoose.model('TestCase', TestCaseSchema);